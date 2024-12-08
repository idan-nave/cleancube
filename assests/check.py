# //  *****************************************************
# //  * File: check.py
# //  * Description: Handles navigation interactions, including 
# //  * hover effects for desktop, and used as a module in all pages
# //  *
# //  * Author: Amit
# //  * Reviewer(s): Idan
# //  * Created On: 2024-12-06
# //  * Last Modified By: Amit
# //  * Last Modified On: 2024-12-08
# //  *
# //  * Version: 1.0.2
# //  *
# //  * Notes:
# //  * - Added touch interaction handling for mobile devices.
# //  * - Optimized hover effect for better performance.
# //  *****************************************************/

# // // JavaScript code starts below

from PIL import Image, ImageEnhance
import numpy as np
import colorsys
from collections import Counter
import sys
import json

# Absolute RGBs of cube
color_refs = {
    "orange": (232, 112, 0),
    "red": (220, 66, 47),
    "yellow": (245, 180, 0),
    "white": (243, 243, 243),
    "blue": (61, 129, 246),
    "green": (0, 157, 84),
}

# better accuracy- remove undesired colors
def rgb_to_hsv(rgb):
    r, g, b = [x / 255.0 for x in rgb]
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return h * 360, s * 255, v * 255

# pre-process, add contrast
def preprocess_image(image):
    contrast_enhancer = ImageEnhance.Contrast(image)
    image = contrast_enhancer.enhance(1.5)

    brightness_enhancer = ImageEnhance.Brightness(image)
    image = brightness_enhancer.enhance(1.2)

    return image

# dividing- 9 images of 3x3
def calculate_dominant_color(sub_image):
    flat_pixels = sub_image.reshape(-1, 3)
    most_common_color = Counter(map(tuple, flat_pixels)).most_common(1)[0][0]
    return np.array(most_common_color)

# dominant avaraging per 9th piece
def classify_color(rgb_value):
    value_hsv = rgb_to_hsv(rgb_value)
    #hue, saturation, value
    hue = value_hsv[0] 
    saturation = value_hsv[1]
    value = value_hsv[2]

    #distinct between the similar orange/yellow of our 3D-CleanCube, remove blacks/greys
    if 20 <= hue <= 40 and saturation > 200:
        return "orange"
    if 40 < hue <= 60 and value > 200:
        return "yellow"

    min_distance = float("inf")
    closest_color = None

    for color_name, ref_rgb in color_refs.items():
        rgb_distance = np.linalg.norm(np.array(rgb_value) - np.array(ref_rgb))
        ref_hsv = rgb_to_hsv(ref_rgb)
        hue_distance = abs(value_hsv[0] - ref_hsv[0])
        total_distance = rgb_distance + 0.5 * hue_distance

        if total_distance < min_distance:
            min_distance = total_distance
            closest_color = color_name
    #returns decided color
    return closest_color

# reconstruct 3x3 after process
def detect_cube_colors(image_path):
    image = Image.open(image_path).convert("RGB")
    image = preprocess_image(image)
    image_array = np.array(image)

    height, width, _ = image_array.shape
    step_x = width // 3
    step_y = height // 3
    colors = []

    for i in range(3):
        row_colors = []
        for j in range(3):
            x_start = j * step_x
            x_end = (j + 1) * step_x
            y_start = i * step_y
            y_end = (i + 1) * step_y

            sub_image = image_array[y_start:y_end, x_start:x_end]
            dominant_color = calculate_dominant_color(sub_image)

            color = classify_color(dominant_color)
            row_colors.append(color)
        colors.append(row_colors)

    return colors


# path arguments
image_paths = sys.argv[1:]

if not image_paths:
    print(json.dumps({"error": "No image paths provided."}))
    sys.exit(1)

results = {}

for i, image_path in enumerate(image_paths, 1):
    try:
        cube_colors = detect_cube_colors(image_path)
        results[f"Image {i}"] = cube_colors
    except FileNotFoundError:
        results[f"Image {i}"] = {"error": f"File not found: {image_path}"}

# json output
print(json.dumps(results))
