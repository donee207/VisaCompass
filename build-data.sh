#!/bin/sh
# data/data.json -> js/data.js
# Brauzer saytni fayl sifatida (file://) ochganda JSON'ni fetch qila olmaydi,
# shuning uchun bazaning nusxasi js/data.js ichiga ham yoziladi.
# data.json o'zgartirilgandan keyin shu skriptni ishga tushiring: sh build-data.sh
cd "$(dirname "$0")"
{ printf '/* AVTOMATIK YARATILGAN — data/data.json dan nusxa. Tahrirlamang. */\nwindow.VISA_DATA = '; cat data/data.json; printf ';\n'; } > js/data.js
echo "js/data.js yangilandi"
