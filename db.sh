#!/bin/sh

PROJECT_DATABASE='blockchain'
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

DATA_DIR="$PROJECT_DIR/sql/scripts/resources/data"
DDL_PATH="$PROJECT_DIR/sql/scripts/resources/ddl/ddl_mysql.sql"
PROJECT_TARGET_DIR_DDL="$PROJECT_DIR/target/all.sql"

function initFile {
  mkdir -p "$PROJECT_DIR/target"
  echo "# `date "+%b_%d_%Y_%H.%M.%S"`" > $PROJECT_TARGET_DIR_DDL
}

#CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
function createDatabase {
  echo $PROJECT_DATABASE $PROJECT_DIR
   mysql -hlocalhost -uroot -e "drop database if exists ${PROJECT_DATABASE}"
   mysql -hlocalhost -uroot -e "create database if not exists ${PROJECT_DATABASE} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
}

function appendFile {
   printf '\tImporting: %s\n' "$(basename $1)"
   cat $1 >> $PROJECT_TARGET_DIR_DDL
}

function appendDataFiles {
   for file in $(find $DATA_DIR -name \*_data.sql) ; do
      # printf 'Directory: %s\n' $file
      appendFile $file
   done
}

function importFile {
   mysql $PROJECT_DATABASE --default-character-set=utf8 -hlocalhost -uroot < $PROJECT_TARGET_DIR_DDL
}

initFile
appendFile $DDL_PATH
appendDataFiles
createDatabase
importFile
echo "Finished database creation"
