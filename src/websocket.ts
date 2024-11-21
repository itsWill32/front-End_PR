let ws: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10; // Número máximo de intentos de reconexión
const RECONNECT_INTERVAL = 5000; // Tiempo en milisegundos entre intentos de reconexión

export const connectWebSocket = (): WebSocket => {
  if (!ws || ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
    console.log("Intentando conectar al WebSocket...");

    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log("Conexión WebSocket establecida con el backend.");
      reconnectAttempts = 0; // Reiniciar el contador de reconexiones
    };

    ws.onmessage = (message) => {
      console.log("Mensaje recibido del WebSocket:", message.data);
    };

    ws.onclose = (event) => {
      console.warn("Conexión WebSocket cerrada:", event);
      ws = null;

      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        console.log(`Intentando reconectar... (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
        setTimeout(() => connectWebSocket(), RECONNECT_INTERVAL);
      } else {
        console.error("No se pudo reconectar al WebSocket después de varios intentos.");
      }
    };

    ws.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };
  }

  return ws;
};
