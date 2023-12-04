#!/bin/sh
':' //; exec /usr/bin/env node --experimental-modules "$0" "$@"

import fetch from 'node-fetch';

const exit = ({ healthy = true } = {}) => {
  return healthy ? process.exit(0) : process.exit(1)
}

const check = () => {
  let port = process.env.PORT || '3000';
  return Promise.all([
    fetch('http://127.0.0.1:' + port + '/')
  ])
}

const handleSuccess = (healthcheck) => {
  return () => {
    healthcheck({ healthy: true })
  }
}

const handleFailure = (healthcheck) => {
  return (e) => {
    healthcheck({ healthy: false })
  }
}

check()
  .then(handleSuccess(exit))
  .catch(handleFailure(exit));