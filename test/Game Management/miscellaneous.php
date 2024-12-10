<?php
// Retrieves default game settings
function getGameSettings() {
    global $pdo;

    $sql = "SELECT setting_name, setting_value FROM game_settings";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Updates game settings
function updateGameSettings($settings) {
    global $pdo;

    foreach ($settings as $name => $value) {
        $sql = "UPDATE game_settings SET setting_value = ? WHERE setting_name = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$value, $name]);
    }

    return ['status' => 'Settings updated'];
}
?>
