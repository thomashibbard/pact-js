npm run dist

cd dist
npm link
cd ..\dist-web
npm link
cd ..

Get-ChildItem ".\examples" -Directory | ForEach-Object {
  Write-Output "Running examples in $($_.FullName)"
  cd $_.FullName
  npm i
  npm t
  if ($LastExitCode -ne 0) { $host.SetShouldExit($LastExitCode)  }
}
