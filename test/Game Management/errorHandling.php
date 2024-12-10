<?php
// Handles errors and returns a standardized error response
function handleError($errorMessage) {
    return ['error' => true, 'message' => $errorMessage];
}

// Logs error details for debugging and monitoring
function logError($errorDetails) {
    global $pdo;

    $sql = "INSERT INTO error_logs (error_message, occurred_at) VALUES (?, NOW())";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$errorDetails]);

    return true;
}
?>
