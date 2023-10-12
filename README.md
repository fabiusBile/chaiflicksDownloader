1. Go to [chrome://version/](chrome://version/) and check current profile name in `Profile Path`
2. If Profile is not `Default` change it in [.env](./.env)
3. Run 
```
$ npm i
```
4. Run USA VPN and login to [Chaiflicks](https://www.chaiflicks.com) in Chrome
5. Run 
```
$ node getEpisdoes.js
```
6. Wait until list of episodes parsed
7. Run
```
$ node getVideoLinks.js
```
8. Wait until direct links to mp4`s downloaded to links.txt
9. Go to folder where you want to store downloaded videos and run
```
$ wget -i /path/to/links.txt
```
10. To name videos in chronological order run
```
line=0
while read p; do
  fileName="${p##*/}"
  line=$((line+1))
  mv "./$fileName"  "./S1E$line.mp4"
done < /path/to/links.txt
```
11. To download another season go to  [.env](./.env) and change `SEASON`