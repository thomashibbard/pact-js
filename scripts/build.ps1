npm run dist
cp package.json dist/package.json
cp package.json.web dist-web/package.json

cd dist
npm link
cd ..
cd dist-web
npm link
cd ..
dir dist
dir dist-web

Get-ChildItem ".\examples" -Directory | ForEach-Object {
  Write-Output "Running examples in $($_.FullName)"
  cd $_.FullName
  npm i

  If ($_.FullName -match "karma") {
    Write-Output "Linking pact web"
    npm link @pact-foundation/pact-web
  } else {
    Write-Output "Linking pact"
    npm link @pact-foundation/pact
  }

  Write-Output "Running tests"
  npm t

  if ($LastExitCode -ne 0) { $host.SetShouldExit($LastExitCode)  }
}
