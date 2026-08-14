# Cover Letter Builder

A production-quality, frontend-only web application for creating professional, customized cover letters. Built with React, Bootstrap 5, and localStorage for data persistence.

## Features

- **Dashboard**: Overview of all cover letters with statistics and quick actions
- **Create/Edit Letters**: Comprehensive form with personal info, job details, and content sections
- **Live Preview**: Real-time preview as you edit with template switching
- **3 Professional Templates**: Classic, Modern, and Minimal layouts
- **Auto-Save**: Automatic saving with debounce functionality
- **Search & Filter**: Search by job title, company, skills; filter by status and template
- **Sorting**: Multiple sorting options (date, job title, company)
- **Duplicate & Delete**: Easy letter management with confirmation dialogs
- **Print/Export**: Browser-based printing to PDF with professional print CSS
- **Character Guidance**: Helpful character count recommendations for each section
- **Completion Indicator**: Track progress on required sections
- **Validation**: Form validation with clear error messages
- **Settings**: Save profile information and default preferences
- **Responsive Design**: Works seamlessly from 320px to 1440px
- **Accessibility**: Semantic HTML, keyboard navigation, proper labels
- **Data Persistence**: All data stored locally in browser localStorage

## Technology Stack

- **React 18.3.1** - UI framework
- **React Router DOM 6.26.1** - Client-side routing
- **Bootstrap 5.3.3** - UI components and styling
- **Bootstrap Icons 1.11.3** - Icon library
- **Vite 5.4.8** - Build tool and dev server
- **JavaScript ES6+** - Modern JavaScript features
- **localStorage** - Client-side data persistence

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Navigate to the project directory:
```bash
cd "c:\Users\Dell\Desktop\cover letter builder"
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
cover-letter-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── templates/
│   │   │   ├── ClassicTemplate.jsx
│   │   │   ├── ModernTemplate.jsx
│   │   │   └── MinimalTemplate.jsx
│   │   ├── AchievementEditor.jsx
│   │   ├── AutoSaveIndicator.jsx
│   │   ├── CharacterCount.jsx
│   │   ├── CompletionIndicator.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── JobInfoForm.jsx
│   │   ├── LetterPreview.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageHeader.jsx
│   │   ├── PersonalInfoForm.jsx
│   │   ├── SkillInput.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── TemplateSelector.jsx
│   │   └── ToastNotification.jsx
│   ├── pages/
│   │   ├── AllLetters.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LetterForm.jsx
│   │   ├── NotFound.jsx
│   │   ├── PreviewLetter.jsx
│   │   ├── Settings.jsx
│   │   └── ViewLetter.jsx
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── sampleData.js
│   │   ├── storage.js
│   │   └── validation.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Routes

- `/` - Dashboard
- `/letters` - All cover letters
- `/letters/new` - Create new cover letter
- `/letters/:id` - View cover letter
- `/letters/:id/edit` - Edit cover letter
- `/letters/:id/preview` - Preview cover letter
- `/settings` - Settings page
- `*` - 404 Not Found

## Usage Guide

### Creating a Cover Letter

1. Click "Create Cover Letter" from the Dashboard or "New Letter" from the Letters page
2. Fill in personal information (name, email, phone, location, LinkedIn, portfolio)
3. Enter job information (title, company, hiring manager, employment type)
4. Write the content sections:
   - Opening paragraph
   - Professional background
   - Skills (add multiple)
   - Achievements (add multiple with descriptions)
   - Why this company
   - Why you're a good fit
   - Closing paragraph
5. Select a template (Classic, Modern, or Minimal)
6. Preview updates in real-time on the right side
7. Click "Save" to save your letter
8. Status defaults to "Draft"; change to "Ready" when complete

### Managing Letters

- **View**: Click "View" to see the full letter with details
- **Edit**: Click "Edit" to modify any section
- **Preview**: Click "Preview" for a clean view with print option
- **Duplicate**: Click "Duplicate" to create a copy (adds "(Copy)" to name)
- **Delete**: Click "Delete" with confirmation to remove

### Search and Filter

- Use the search bar to find letters by job title, company, or skills
- Filter by status (All, Draft, Ready)
- Filter by template (All, Classic, Modern, Minimal)
- Sort by various options (recently updated, oldest, job title, company)

### Printing/Exporting

1. Open a letter in View or Preview mode
2. Click "Print / Save as PDF"
3. Use your browser's print dialog to save as PDF
4. Only the cover letter content will be printed (UI elements hidden)

### Settings

- Save your profile information to auto-populate new letters
- Set default template and employment type
- Reset profile or settings to defaults with confirmation

## Data Storage

All data is stored locally in your browser's localStorage:
- Cover letters
- User profile
- Application settings

**Important**: Clearing browser data will delete all your cover letters. Consider exporting important letters as PDFs for backup.

## Sample Data

On first launch, the application creates 2 sample cover letters:
1. Frontend Developer — TechCorp (Modern template)
2. UI Developer — DesignStudio (Classic template)

These can be deleted and are not recreated after deletion.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML structure
- Proper form labels and ARIA attributes
- Keyboard navigation support
- Visible focus states
- Screen reader compatible
- Color-blind friendly status indicators

## Responsive Breakpoints

- 320px - Minimum mobile width
- 375px - Small mobile
- 425px - Large mobile
- 768px - Tablet
- 1024px - Desktop
- 1440px - Large desktop

## Known Limitations

- No backend/cloud storage (data is local only)
- No collaboration features
- No AI-powered suggestions
- Limited to browser localStorage capacity (~5-10MB)
- No export to Word/Google Docs format

## Troubleshooting

### Letters not saving
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing browser cache and reloading

### Print preview shows UI elements
- Ensure print CSS is loaded
- Try a different browser
- Check browser print settings

### Template not applying
- Refresh the page
- Check browser console for errors
- Ensure template selection is saved

## Development

### Adding New Templates

1. Create a new template component in `src/components/templates/`
2. Add the template option to `TemplateSelector.jsx`
3. Update `LetterPreview.jsx` to include the new template
4. Follow the existing template structure for consistency

### Modifying Validation Rules

Edit `src/utils/validation.js` to change validation rules and error messages.

### Changing Sample Data

Modify `src/utils/sampleData.js` to customize initial sample letters.

# 👨‍💻 Authors
- ***❤ABDUL SABOOR***
  ---

## License

``` This project is open source and available for personal and commercial use.

## Support

``` For issues or questions, please check the browser console for error messages and ensure all dependencies are properly installed.
