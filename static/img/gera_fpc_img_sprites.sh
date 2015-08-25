#/bin/bash
glue .  --css=../css/ --img=fpc --namespace=fpc --html -c 
mv fpc/img.png fpc/fpc_img.png
sed 's/img.png'/fpc_img.png'/g' ../css/img.css   > ../css/fpc_img.css
sed 's/img.css/fpc_img.css/g' ../css/img.html   > ../css/fpc_img.html
rm ../css/img.css
rm ../css/img.html
echo "concluído."
