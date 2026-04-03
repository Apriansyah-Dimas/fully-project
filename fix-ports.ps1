# PowerShell script to kill all Node.js processes using ports 3000-3005
Get-NetTCPConnection -State Listen | Where-Object {$_.LocalPort -ge 3000 -and $_.LocalPort -le 3005} | Select-Object OwningProcess | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Write-Host "Killed processes using ports 3000-3005"