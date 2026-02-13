# תמונות בית"ר ירושלים / Beitar Jerusalem Images

תיקייה זו מכילה את כל התמונות והאייקונים לאפליקציית הלימוד של בית"ר ירושלים.
This folder contains all images and icons for the Beitar Jerusalem learning application.

## תמונות זמינות / Available Images

### 🏆 לוגו ודימויי מותג / Logo and Brand
- **beitar-logo.svg** - לוגו בית"ר ירושלים עם מגן, פסים צהובים ומגן דוד
  - Logo of Beitar Jerusalem with shield, yellow stripes, and Star of David
  - גודל: 200×200 פיקסלים
  - שימוש: כותרת, לוגו ראשי, זיהוי מותג

### ⚽ כדורגל / Football
- **football.svg** - כדור כדורגל בצבעי בית"ר (שחור וצהוב)
  - Soccer ball in Beitar colors (black and yellow)
  - גודל: 100×100 פיקסלים
  - שימוש: אייקון כללי, עיצוב, הנפשות

- **goal.svg** - שער כדורגל עם רשת וכדור
  - Football goal with net and ball
  - גודל: 150×120 פיקסלים
  - שימוש: הישגים, תשובות נכונות, ניצחונות

- **field.svg** - מגרש כדורגל מלא מלמעלה
  - Full football field from above
  - גודל: 200×150 פיקסלים
  - שימוש: רקע, תפריט ראשי, מסך התחלה

- **corner-flag.svg** - דגל פינת מגרש בצבעי בית"ר
  - Corner flag in Beitar colors
  - גודל: 60×100 פיקסלים
  - שימוש: סמנים, עיצוב פינות, אלמנטים דקורטיביים

### 👕 ביגוד וציוד / Apparel and Equipment
- **jersey.svg** - חולצת משחק עם פסים שחורים וצהובים ומספר 10
  - Match jersey with black and yellow stripes and number 10
  - גודל: 100×120 פיקסלים
  - שימוש: אווטר שחקן, בחירת רמה, פרופיל משתמש

- **whistle.svg** - שריקת שופט
  - Referee whistle
  - גודל: 100×60 פיקסלים
  - שימוש: מצב חידון, התחלת משחק, כפתורים

### 🏅 הישגים ופרסים / Achievements and Awards
- **trophy.svg** - גביע זהב
  - Gold trophy
  - גודל: 100×120 פיקסלים
  - שימוש: הישגים, סיום משחק מוצלח, שיאים

- **star.svg** - כוכב זהב עם אפקט הדרגה
  - Gold star with gradient effect
  - גודל: 100×100 פיקסלים
  - שימוש: ניקוד, תשובות נכונות, דירוג

### 🎨 רקעים ותבניות / Backgrounds and Patterns
- **background-pattern.svg** - דוגמת פסים אלכסוניים שחורים וצהובים
  - Diagonal stripes pattern in black and yellow
  - גודל: 400×400 פיקסלים
  - שימוש: רקע חוזר, עיצוב דפים, תבנית

## מפרט טכני / Technical Specifications

### פורמט / Format
- כל התמונות בפורמט **SVG** (Scalable Vector Graphics)
- תמיכה מלאה בדפדפנים מודרניים
- ניתן להגדלה ללא אובדן איכות

### צבעים / Colors
הצבעים הרשמיים של בית"ר ירושלים:
- **שחור (Black)**: `#000000`
- **צהוב (Gold/Yellow)**: `#FFD700`
- **לבן (White)**: `#FFFFFF` (לניגודיות)
- **ירוק דשא (Grass Green)**: `#2d5016` (למגרש)

### גדלים / Sizes
| תמונה | רוחב | גובה | יחס גובה-רוחב |
|-------|------|------|---------------|
| beitar-logo.svg | 200px | 200px | 1:1 |
| football.svg | 100px | 100px | 1:1 |
| goal.svg | 150px | 120px | 5:4 |
| trophy.svg | 100px | 120px | 5:6 |
| jersey.svg | 100px | 120px | 5:6 |
| field.svg | 200px | 150px | 4:3 |
| star.svg | 100px | 100px | 1:1 |
| whistle.svg | 100px | 60px | 5:3 |
| corner-flag.svg | 60px | 100px | 3:5 |
| background-pattern.svg | 400px | 400px | 1:1 |

## שימוש / Usage

### HTML
```html
<!-- שימוש ישיר -->
<img src="assets/images/beitar-logo.svg" alt="לוגו בית"ר ירושלים" width="200">

<!-- כרקע -->
<div style="background-image: url('assets/images/background-pattern.svg');">
```

### CSS
```css
/* כרקע */
.header {
    background-image: url('../assets/images/beitar-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
}

/* כדוגמה חוזרת */
.striped-bg {
    background-image: url('../assets/images/background-pattern.svg');
    background-repeat: repeat;
}
```

### JavaScript
```javascript
// טעינה דינמית
const img = document.createElement('img');
img.src = 'assets/images/star.svg';
img.alt = 'כוכב';
document.body.appendChild(img);
```

## רישיון / License
תמונות אלו נוצרו במיוחד עבור פרויקט "בית"ר ירושלים - לומדים מספרים".
These images were created specifically for the "Beitar Jerusalem - Learning Numbers" project.

## תצוגה מקדימה / Preview
לתצוגה מקדימה של כל התמונות, פתחו את הקובץ `images-demo.html` בדפדפן.
For a preview of all images, open the `images-demo.html` file in a browser.
