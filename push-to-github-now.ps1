# HubShop - Push to GitHub Script
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Push HubShop to GitHub" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if remote exists
$remoteExists = & "C:\Program Files\Git\bin\git.exe" remote -v 2>&1
if ($remoteExists -match "origin") {
    Write-Host "✓ Remote repository already configured!" -ForegroundColor Green
    & "C:\Program Files\Git\bin\git.exe" remote -v
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    & "C:\Program Files\Git\bin\git.exe" branch -M main 2>$null
    & "C:\Program Files\Git\bin\git.exe" push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "===================================" -ForegroundColor Green
        Write-Host "SUCCESS! Your code is on GitHub!" -ForegroundColor Green
        Write-Host "===================================" -ForegroundColor Green
        Write-Host ""
        $remoteUrl = (& "C:\Program Files\Git\bin\git.exe" remote get-url origin)
        Write-Host "View your repository at:" -ForegroundColor Cyan
        $repoUrl = $remoteUrl -replace '\.git$', ''
        Write-Host $repoUrl -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Opening in browser..." -ForegroundColor Cyan
        Start-Process $repoUrl
    } else {
        Write-Host ""
        Write-Host "ERROR: Push failed" -ForegroundColor Red
        Write-Host "You may need to authenticate or create the repository first." -ForegroundColor Yellow
    }
} else {
    Write-Host "No GitHub repository configured yet." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please follow these steps:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
    Write-Host "2. Create a repository named 'hubshop'" -ForegroundColor White
    Write-Host "3. DO NOT initialize with README" -ForegroundColor White
    Write-Host "4. Copy the repository URL" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this command (replace YOUR_USERNAME):" -ForegroundColor Cyan
    Write-Host ""
    Write-Host '  & "C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/YOUR_USERNAME/hubshop.git' -ForegroundColor Yellow
    Write-Host '  & "C:\Program Files\Git\bin\git.exe" branch -M main' -ForegroundColor Yellow
    Write-Host '  & "C:\Program Files\Git\bin\git.exe" push -u origin main' -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or use GitHub Desktop (easier):" -ForegroundColor Cyan
    Write-Host "https://desktop.github.com/" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

