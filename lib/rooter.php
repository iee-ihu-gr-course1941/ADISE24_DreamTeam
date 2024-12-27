<?php

class Router {
    private $routes = [];

    // Add routes dynamically
    public function add($method, $path, $function) {
        // Convert route placeholders to regex
        $pattern = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([^/]+)', $path);
        // Store route with regex pattern and function
        $this->routes[strtoupper($method)][] = [
            'pattern' => "#^$pattern$#",
            'function' => $function
        ];
    }

    // Handle the request
    public function handle($method, $path, $input) {
        $method = strtoupper($method);

        // Check if the method has registered routes
        if (!isset($this->routes[$method])) {
            header("HTTP/1.1 404 Not Found");
            echo json_encode(["error" => "Method not allowed"]);
            return;
        }

        // Loop through registered routes for the method
        foreach ($this->routes[$method] as $route) {
            if (preg_match($route['pattern'], $path, $matches)) {
                // Remove the full match and pass the rest as arguments
                array_shift($matches);
                call_user_func_array($route['function'], array_merge($matches, [$input]));
                return;
            }
        }

        // If no route matches, return 404
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Endpoint not found"]);
    }

    // Parse and handle the incoming request
    public function routeRequest($input) {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = trim($_SERVER['PATH_INFO'], '/'); // Clean the path
        $input['token'] = $_SERVER['HTTP_X_TOKEN'] ?? ''; // Optional token for security

        $this->handle($method, $path, $input);
    }
}

?>
