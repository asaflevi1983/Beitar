# תמונות בית"ר ירושלים / Beitar Jerusalem Images

## תמונות קיימות / Existing Images

התיקייה `assets/images/` מכילה תמונות SVG של אייקונים קשורים לכדורגל ובית"ר.

## הוספת תמונות אמיתיות / Adding Real Images

כדי להוסיף תמונות אמיתיות של בית"ר ירושלים:

### 1. תמונות מומלצות / Recommended Images

- **לוגו הקבוצה**: סמל בית"ר ירושלים הרשמי
- **תמונות שחקנים**: שחקני הקבוצה הנוכחיים או לשעבר
- **תמונות מגרש**: אצטדיון טדי
- **תמונות אוהדים**: ים של צהוב ושחור באצטדיון
- **גביעים והישגים**: תמונות של גביעים שהקבוצה זכתה בהם

### 2. היכן למקם את התמונות / Where to Place Images

```
assets/
  └── images/
      ├── photos/              (תיקייה חדשה לתמונות אמיתיות)
      │   ├── logo.jpg         (לוגו הקבוצה)
      │   ├── stadium.jpg      (אצטדיון טדי)
      │   ├── players.jpg      (שחקנים)
      │   └── fans.jpg         (אוהדים)
```

### 3. שימוש בתמונות / Using Images

ניתן להוסיף תמונות למשחקים:

```html
<!-- בכותרת -->
<img src="assets/images/photos/logo.jpg" alt="בית\"ר ירושלים" class="team-logo">

<!-- ברקע -->
<div class="background-image" style="background-image: url('assets/images/photos/stadium.jpg')">
```

### 4. מקורות תמונות / Image Sources

מקורות מומלצים לתמונות חופשיות לשימוש:

- **אתר הקבוצה הרשמי**: https://www.fcbj.co.il/
- **ויקיפדיה**: https://he.wikipedia.org/wiki/בית%27ר_ירושלים_(כדורגל)
- **ויקימדיה Commons**: תמונות בנחלת הכלל
- **רישיון Creative Commons**: תמונות עם רישיון שימוש חופשי

### 5. הערות חשובות / Important Notes

⚠️ **שימו לב לזכויות יוצרים!** ודאו שיש לכם רשות להשתמש בתמונות.

- השתמשו רק בתמונות עם רישיון מתאים
- ציינו קרדיט למקור אם נדרש
- העדיפו תמונות בנחלת הכלל או עם רישיון Creative Commons

## תמונות SVG קיימות / Existing SVG Images

התמונות הקיימות בפרויקט:
- `beitar-logo.svg` - לוגו סטיליזציה
- `football.svg` - כדור כדורגל
- `trophy.svg` - גביע
- `jersey.svg` - חולצת כדורגל
- `goal.svg` - שער
- `field.svg` - מגרש
- `star.svg` - כוכב
- `whistle.svg` - שריקה
- `corner-flag.svg` - דגל פינה
- `background-pattern.svg` - דוגמת רקע
