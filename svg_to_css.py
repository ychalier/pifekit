import glob
import argparse
import os
import xml.etree.ElementTree
import urllib.parse


DEMO_HTML = """
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/ychalier/pifekit/pifekit.min.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/ychalier/pifekit/pifekit.min.js"></script>
<style>PLACEHOLDER_STYLE</style>
</head>
<body><div class="columns">PLACEHOLDER_BODY</div></body>
</html>
"""


def svg_to_css(svg_path):
    name = os.path.splitext(os.path.basename(svg_path))[0]
    with open(svg_path) as file:
        svg_raw = xml.etree.ElementTree.parse(file)
    inner_content = ""
    for child in svg_raw.getroot():
        if child.tag not in ["{http://www.w3.org/2000/svg}g", "{http://www.w3.org/2000/svg}path"]:
            continue
        if "id" in child.attrib:
            del child.attrib["id"]
        inner_content += xml.etree.ElementTree\
            .tostring(child, method="xml")\
            .decode()\
            .replace("ns0:", "")\
            .replace("xmlns:ns0=\"http://www.w3.org/2000/svg\" ", "")
    svg_clean = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='%s' fill='white'>%s</svg>" % (
        svg_raw.getroot().attrib["viewBox"],
        inner_content
    )
    svg_encoded = "url(\"data:image/svg+xml,%s\")" % (urllib.parse.quote(svg_clean.encode("utf8")))
    return ".icon-%s {\n    background-color: currentColor;\n    mask-image: %s;\n    -webkit-mask-image: %s;\n}" % (name, svg_encoded, svg_encoded)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("folder", type=str, help="path to the folder containing svg icons")
    parser.add_argument("--demo", action="store_true")
    args = parser.parse_args()
    output = ""
    for path in glob.glob(os.path.join(args.folder, "*.svg")):
        output += svg_to_css(path) + "\n"
    if args.demo:
        body = ""
        for path in glob.glob(os.path.join(args.folder, "*.svg")):
            name = os.path.splitext(os.path.basename(path))[0]
            # body += "<i class=\"icon icon-%s\"></i>" % name
            body += """<div class="column col-3 col-md-6"><button class="btn btn-primary btn-action btn-lg"><i class="icon icon-%s"></i></button><p>icon-%s</p></div>""" % (name, name)
        html = DEMO_HTML.replace("PLACEHOLDER_STYLE", output).replace("PLACEHOLDER_BODY", body)
        print(html)
    else:
        print(output)


if __name__ == "__main__":
    main()
