# Student Finance Tracker

A **simple, responsive Student Finance Tracker** built with **HTML, CSS, and JavaScript**.  
Tracks expenses, allows regex search, shows stats, and supports **currency conversion** with **USD as the base currency**.
## link to video url -> (https://youtu.be/ioLOL2SdBq8)
---

## Features

- Add / Edit / Delete transactions  
- Categories: Food, Books, Transport, Entertainment, Fees, Other  
- Regex validation for inputs:  
  - **Description:** no leading/trailing spaces (`/^\S(?:.*\S)?$/`)  
  - **Amount:** numeric with up to 2 decimals (`/^(0|[1-9]\d*)(\.\d{1,2})?$/`)  
  - **Date:** YYYY-MM-DD format (`/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/`)  
- **Advanced Regex examples for search**:  
  - Detect duplicate words: `/\b(\w+)\s+\1\b/`  
  - Case-insensitive searches like `/coffee|tea/i`  
- **Stats Dashboard:** total transactions and total amount  
- **Currency conversion:** RWF (base), USD, EUR  
- Responsive and **mobile-first design**  
- **Accessibility:** keyboard navigation, skip-to-content link, visible focus, ARIA live updates

---

## Data & Persistence

- All data saved in **`localStorage`**  
- Each transaction record:

```json
{
  "id": "txn_1634678",
  "description": "Lunch at cafeteria",
  "amount": 1200,
  "category": "Food",
  "date": "2025-09-25",
  "createdAt": "...",
  "updatedAt": "..."
}
