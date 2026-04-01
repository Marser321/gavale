from PIL import Image
import os

img_path = r"C:\Users\morer\.gemini\antigravity\brain\41f1728e-e5ab-4268-8e2c-edb92c264845\media__1775071466911.png"
output_dir = r"C:\Users\morer\Downloads\Scrapear contenido de web para mejorar landing page\gavale-landing\public\images"

# Load the image
img = Image.open(img_path)
width, height = img.size

# We have 5 cards. We can divide width by 5.
card_width = width / 5
# By looking at typical cards, the image usually occupies the top 55% or so.
# We'll just crop the top part. Let's say top 0 to top 280.
top = 0
bottom = 280 # adjust later if needed

for i in range(5):
    left = i * card_width
    right = (i + 1) * card_width
    
    # We probably want to trim the small gaps between the cards
    # Let's say we inset by 5 pixels on left and right
    gap = 4
    crop_img = img.crop((left + gap, top, right - gap, bottom))
    
    out_path = os.path.join(output_dir, f"real_review_{i+1}.jpg")
    crop_img.convert("RGB").save(out_path, "JPEG", quality=90)
    print(f"Saved {out_path}")

print("Done slicing!")
