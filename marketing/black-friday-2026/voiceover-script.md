# PERFECT LAB — Black Friday Reel: Voiceover Script

**Voice:** a calm, elegant Egyptian female voice. Friendly and confident, unhurried, smiling tone.
**Delivery:** soft and warm. Leave short pauses at the ".." marks. Keep the music at about −20 dB under the voice.
**Length:** 25 s. Every line is timed to land inside its scene.

| Time | Scene | Egyptian Arabic line | Direction |
|---|---|---|---|
| 0.6 – 3.4 s | 1: logo and "BLACK FRIDAY IS HERE!" | **البلاك فرايداي وصل!** | Bright and inviting, slight lift at the end |
| 4.6 – 9.4 s | 2: lab footage, "Your Health Deserves the Best!" | **صحتك تستاهل الأحسن.. ومع برفكت لاب، الدقة في كل نتيجة.** | Warm and reassuring |
| 10.8 – 16.8 s | 3: the big golden 100 | **تحاليل طبية مختارة.. بـ ١٠٠ جنيه بس!** | Slow down and lean on "١٠٠ جنيه بس" |
| 18.4 – 24.6 s | 4: logo and closing | **اهتم بصحتك، واستفيد بعروض الوايت فرايداي من برفكت لاب.. برفكت لاب: دقة تثق فيها.. ورعاية تستحقها.** | Calm and confident. Say the tagline softly and slowly |

## Adding the voice to the video

1. Record the lines, or generate them (for example with Microsoft Azure TTS `ar-EG-SalmaNeural`, or ElevenLabs with an Egyptian female voice), as one WAV that is 25 s long and timed to the table above.
2. Mix it over the delivered video, lowering the existing music under the voice:

```bash
ffmpeg -i perfect-lab-black-friday-reel.mp4 -i voiceover.wav -filter_complex \
 "[0:a]volume=0.55[m];[1:a]loudnorm=I=-16:TP=-1.5,asplit[v1][v2];[m][v1]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=400[d];[d][v2]amix=inputs=2:duration=first:normalize=0[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k perfect-lab-black-friday-reel-vo.mp4
```

The `sidechaincompress` step lowers the music automatically while the voice is speaking.
