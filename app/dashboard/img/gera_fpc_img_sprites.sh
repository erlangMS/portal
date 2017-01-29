#/bin/bash
#
# Este script necessita do comando glue: http://glue.readthedocs.io/en/latest/installation.html
#
# Setup:
#      $ apt-get install libjpeg62 libjpeg62-dev zlib1g-dev python-dev
#      $ sudo pip install glue
#
#
# Author: Everton de Vargas Agilar

glue-sprite . --css ../css/ --img ../css --namespace=fpc --html ../css/ -c
mv ../css/img.png ../css/fpc_img.png
mv ../css/img.css ../css/fpc_img.css
mv ../css/img.html ../css/fpc_img.html
sed -i 's/img.css/fpc_img.css/' ../css/fpc_img.html
sed -i 's/img.png/fpc_img.png/' ../css/fpc_img.css
echo "concluído."
