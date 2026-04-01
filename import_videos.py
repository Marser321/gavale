import os
import shutil

src_dir = r"c:\Users\morer\OneDrive\Desktop\gravale"
dest_dir = r"c:\Users\morer\Downloads\Scrapear contenido de web para mejorar landing page\gavale-landing\public\videos"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

videos = {
    "Addicted to this fit on @maryanvelasco 🤩.mp4": "maryan_fit.mp4",
    "Entrenamiento de glúteos, usando este set que me encantó de @gavale_sportswear.mp4": "glute_workout.mp4",
    "Estos estrenos de @gavale_sportswear están ❤️_🔥❤️_🔥.mp4": "new_arrivals.mp4",
    "Proof that a cute outfit better workouts 😉🔥Because confidence is the best pre-workout.💫 Est.mp4": "confidence_workout.mp4",
    "Red Jumpsuit 😍♥️.mp4": "red_jumpsuit.mp4",
    "Tu solo sonríe 💙 @gavale_sportswear.mp4": "blue_smile.mp4",
    "Vengo ahora 😂 nos fuimos a RD 🇩🇴🤪Mi outfit de aeropuerto está demasiado cómodo @gavale_sport.mp4": "airport_outfit.mp4"
}

for orig, new_name in videos.items():
    s = os.path.join(src_dir, orig)
    d = os.path.join(dest_dir, new_name)
    if os.path.exists(s):
        print(f"Copying {orig} to {new_name}")
        shutil.copy2(s, d)
    else:
        print(f"File not found: {s}")

print("Assets copied successfully.")
