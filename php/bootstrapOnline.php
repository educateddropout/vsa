<?php

require 'database/ConnectionOnline.php';
require 'database/QueryBuilderOnline.php';

return new QueryBuilderOnline(ConnectionOnline::make());




?>