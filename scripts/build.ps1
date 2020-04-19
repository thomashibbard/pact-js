npm run dist

cd dist
npm link
cd ..
cd dist-web
npm link
cd ..

Get-ChildItem ".\examples" -Directory | ForEach-Object {
  Write-Output "Running examples in $($_.FullName)"
  cd $_.FullName
  npm i
  If ($_.FullName -match "karma") {
    npm link @pact-foundation/pact-web
  } else {
    npm link @pact-foundation/pact
  }
  npm t
  if ($LastExitCode -ne 0) { $host.SetShouldExit($LastExitCode)  }
}
