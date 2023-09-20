git add .
echo "Enter Your Commit comment"
read msg 
git commit -m $msg
git push origin master