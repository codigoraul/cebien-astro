<?php
/**
 * Procesa el formulario de contacto y envía el mensaje por correo.
 * Pensado para hosting cPanel con PHP. Sube junto al sitio estático.
 */

declare(strict_types=1);

$DESTINO = 'secretaria.cebien@gmail.com';
$ASUNTO  = 'Nuevo mensaje desde el sitio web';
// Debe ser una casilla del propio dominio para que el correo no sea rechazado.
$REMITENTE = 'no-responder@cebien.cl';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contacto', true, 303);
    exit;
}

/** Evita inyección de cabeceras en los campos que van al encabezado del correo. */
function limpiar(string $valor): string {
    $valor = trim($valor);
    $valor = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $valor);
    return substr($valor, 0, 250);
}

// Campo trampa: si viene lleno, es un bot.
if (!empty($_POST['sitio_web'])) {
    header('Location: /gracias', true, 303);
    exit;
}

$nombre   = limpiar($_POST['nombre'] ?? '');
$email    = limpiar($_POST['email'] ?? '');
$telefono = limpiar($_POST['telefono'] ?? '');
$motivo   = limpiar($_POST['motivo'] ?? 'Sin especificar');
$mensaje  = trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $mensaje === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: /contacto?error=1', true, 303);
    exit;
}

$cuerpo = "Nuevo mensaje desde el formulario de cebien.cl\n\n"
    . "Nombre:   {$nombre}\n"
    . "Correo:   {$email}\n"
    . "Teléfono: {$telefono}\n"
    . "Motivo:   {$motivo}\n\n"
    . "Mensaje:\n" . strip_tags($mensaje) . "\n\n"
    . "---\n"
    . 'Enviado el ' . date('d-m-Y H:i') . " desde " . ($_SERVER['REMOTE_ADDR'] ?? 'IP desconocida') . "\n";

$cabeceras = [
    'From: Sitio web Cebien <' . $REMITENTE . '>',
    'Reply-To: ' . $nombre . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$enviado = mail($DESTINO, $ASUNTO . ' — ' . $motivo, $cuerpo, implode("\r\n", $cabeceras));

header('Location: ' . ($enviado ? '/gracias' : '/contacto?error=2'), true, 303);
exit;
