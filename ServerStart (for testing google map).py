import http.server
import socketserver
import webbrowser

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    print("Open URL")
    webbrowser.open('http://localhost:8080/')
    httpd.serve_forever() 
