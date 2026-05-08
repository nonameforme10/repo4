@echo off
echo [1/4] Updating sw.js VERSION...

powershell -NoProfile -Command "$q=[char]34; $lines=Get-Content 'sw.js'; $out=foreach($line in $lines){if($line -match ('const VERSION = '+$q+'(.*?)'+$q)){$v=$matches[1]; $p=$v.Split('.'); if($p.Length -ge 15){$m=[int]$p[1]+1; $nV=$p[0]+'.'+$m}else{$nV=$v+'.1'} $line.Replace($v,$nV)}else{$line}}; Set-Content 'sw.js' -Value $out"

echo [1/4] Launching Firebase functions deployment...
start "Functions Deploy" powershell -Command "npm run deploy:functions"

echo [2/4] Launching Vercel production deployment...
start "Vercel Deploy" powershell -Command "npm run deploy:vercel:prod"

echo [3/4] Launching GitHub production deployment...
start "GitHub Deploy" powershell -Command "git add .; git commit -m 'fixed'; git push"

echo Task complete. All deployments are running in parallel and will close automatically upon completion.   
