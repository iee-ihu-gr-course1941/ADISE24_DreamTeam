<?php 

function getApiVersion() {
    echo json_encode(
        ['api_version' => '1.2.0',
        'users' => 'done',
        'lobbys' => 'in progrees',
        'leaderboard' => 'done'
    ]);
}
?>