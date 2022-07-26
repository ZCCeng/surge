var body = $response.body.replace(/type":"\w+"/g, 'type":"free"')
$done({ body });
