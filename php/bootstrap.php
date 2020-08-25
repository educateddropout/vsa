<?php

require 'database/Connection.php';
require 'database/EnConfig.php';
require 'database/QueryBuilder.php';

return new QueryBuilder(Connection::make(), EnConfig::decryptor());




?>