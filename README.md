# Calculator Application

A sleek, responsive, and fully functional web-based calculator built with HTML, CSS, and Vanilla JavaScript.

## Features
- **Modern UI**: Clean design utilizing CSS Grid, rounded buttons, and an aesthetic dark color palette.
- **Responsive Layout**: Perfectly scales down for mobile and tablet devices.
- **Robust Math Logic**: Performs addition, subtraction, multiplication, and division. Supports chaining sequential operations (e.g. `5 + 5 + ...`).
- **Edge-Case Handling**: 
  - Prevents multiple decimals from being entered.
  - Safely handles division by zero by displaying an `'Error'` message.
  - Precision handling to combat floating point anomalies (like `0.1 + 0.2`).
- **Additional Functions**: Includes a Clear (`C`), Percentage (`%`), and toggle-sign (`+/-`) button.
- **Performance Optimized**: Uses JavaScript Event Delegation to minimize event listeners.

## Suggested Folder Structure
For future scalability, it is recommended to structure your project files as follows:

```text
calculator-app/
├── index.html        # Main HTML layout
├── css/
│   └── styles.css    # Styling rules
├── js/
│   └── script.js     # JavaScript logic and DOM manipulation
└── README.md         # Documentation
```

*(Note: Currently, the files are kept flat in the same directory for simplicity. If you implement the structure above, be sure to update the `<link>` and `<script>` paths in your `index.html`!)*

## How to Run
This is a static front-end project and does not require a build step or backend server.
1. Download or clone the repository to your local machine.
2. Open `index.html` in any modern web browser (e.g., Chrome, Firefox, Edge, Safari).
3. Start calculating!
