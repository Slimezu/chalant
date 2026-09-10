import http.server
import socketserver
import os
import urllib.parse
import mimetypes

PORT = 4444

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.lstrip('/')
        
        # Map /cesium/... to node_modules/cesium/...
        if path.startswith('cesium/'):
            subpath = path[len('cesium/'):]  # strip "cesium/"
            node_path = os.path.join('node_modules', 'cesium', subpath)
            if os.path.exists(node_path):
                self.serve_file(node_path)
                return
            else:
                self.send_error(404, f'Cesium file not found: {node_path}')
                return
        
        # Serve everything else normally
        try:
            super().do_GET()
        except Exception:
            self.send_error(404, f'File not found: {path}')
    
    def serve_file(self, path):
        try:
            ctype = mimetypes.guess_type(path)[0]
            if ctype is None or path.endswith('.js'):
                ctype = 'application/javascript'
            with open(path, 'rb') as f:
                data = f.read()
            self.send_response(200)
            self.send_header('Content-Type', ctype)
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, str(e))

if __name__ == '__main__':
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        print(f'Serving at http://localhost:{PORT}')
        print(f'Cesium served from: node_modules/cesium')
        httpd.serve_forever()