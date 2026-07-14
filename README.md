# tmail

Simple CLI for tempmail.lol - generate temporary email addresses and watch for incoming messages.


https://github.com/user-attachments/assets/f0812700-a1d7-4317-b7f5-526f14cfadee


## Installation

```bash
npm install -g @dag_shell/tmail
```

Or link locally for development:

```bash
npm link
```

## Usage

### Create a new temporary email

```bash
npx @dag_shell/tmail
```

Or if installed globally:

```bash
tmail
```

This creates a new inbox and starts watching for incoming emails. The inbox details are saved to `~/.tmail.json`.

### Resume a previous session

```bash
tmail resume
```

Resumes watching the previously saved inbox.

## Development

### Project Structure

```
tmail/
├── bin/
│   └── tmail.js       # Main CLI entry point
├── package.json       # Package configuration
└── README.md          # This file
```

### Dependencies

- `tempmail.lol` - API client for tempmail.lol service

### Running locally

```bash
# Link the package globally
npm link

# Run the CLI
tmail
```

### Configuration

The CLI saves inbox credentials to `~/.tmail.json`:
```json
{
  "address": "your-email@domain.com",
  "token": "your-token"
}
```

## Features

- Create temporary email addresses
- Watch inbox for new messages (polls every 5 seconds)
- Resume previous sessions
- Deduplicate emails to avoid showing the same message twice
- Clean, emoji-enhanced output

## License

MIT
