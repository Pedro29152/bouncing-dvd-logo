from flask import Flask, render_template

app = Flask("dvd-logo-bounce")

@app.route("/")
def index():
    return render_template("index.html")

app.run()

