# Simple Notes Application

A basic web application for creating, viewing, editing, and deleting text-based notes.

## Features

* **Create Notes:** Add new notes with a title and content.
* **View Notes:** Display all stored notes.
* **Edit Notes:** Update the title and content of existing notes.
* **Delete Notes:** Remove notes from the system.
* **Simple UI:** Clean and straightforward user interface.

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
* **Backend:** PHP
* **Database:** MySQL
* **Server:** Apache (via XAMPP)

## Setup Instructions

1.  **XAMPP:** Ensure you have [XAMPP](https://www.apachefriends.org/index.html) installed and running (Apache and MySQL modules).

2.  **Project Placement:**
    * Place this entire `simple-notes-app` folder into your XAMPP `htdocs` directory (e.g., `C:\xampp\htdocs\simple-notes-app`).

3.  **Database Setup:**
    * Open phpMyAdmin in your browser (usually `http://localhost/phpmyadmin`).
    * Create a new database named `simple_notes_db`.
    * Go to the `SQL` tab and execute the SQL commands found in `database/schema.sql` to create the `notes` table and populate it with sample data.

4.  **Configuration:**
    * Open `backend/config.php`.
    * Verify `DB_PASS` (usually `''` for XAMPP `root` user) and `DB_NAME` (`'simple_notes_db'`) are correct for your setup.

## How to Use

1.  Start Apache and MySQL in your XAMPP control panel.
2.  Open your web browser and navigate to:
    `http://localhost/simple-notes-app/public/index.html`
3.  You should see the application loaded with existing notes.
4.  Use the form to add new notes, and the "Edit" and "Delete" buttons to manage your notes.
