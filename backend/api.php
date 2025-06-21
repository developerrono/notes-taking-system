<?php

header('Content-Type: application/json');
require_once 'database.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    case 'get_all':
        getAllNotes();
        break;
    case 'add':
        addNote($data);
        break;
    case 'update':
        updateNote($data);
        break;
    case 'delete':
        deleteNote($data);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action.']);
        break;
}

function getAllNotes() {
    $conn = getDbConnection();
    $result = $conn->query("SELECT id, title, content, created_at, updated_at FROM notes ORDER BY updated_at DESC");
    $notes = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $notes[] = $row;
        }
    }
    $conn->close();
    echo json_encode(['success' => true, 'data' => $notes]);
}

function addNote($data) {
    $title = $data['title'] ?? '';
    $content = $data['content'] ?? '';

    if (empty($title)) {
        echo json_encode(['success' => false, 'message' => 'Title is required.']);
        return;
    }

    $conn = getDbConnection();