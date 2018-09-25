# Why

Because web performance matters!

# What

Compare web performance metrics of your website against competiton, using the scores from PageSpeed Insights API. You can compare First Contentful Paint (FCP), DOM Content Loaded (DCL) and overall scores in percentage.

# How to get this working

- In the root of this project, create a "settings" folder
  - In this folder, create a file called "secret.js", containing something similar to: https://gist.github.com/akmur/f27a7ba7f159c5fcfe0776437ccbef12 
  - In this folder, create the file "urls.js" which contains the name of the websites and the URLS we want to use, for example 4 home pages, 4 category pages, 4 product pages, similar to: https://gist.github.com/akmur/62b28703e208069eab16bc3298cc13be
- Install node on your machine if you don't have it already
- Run "npm install" in your terminal
- Run "npm run start" to start the server
- Visit in your browser http://localhost:3333/

# To-do

- Compare also the pageStats for every added website
