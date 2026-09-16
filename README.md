# Neovim Workshop

## Setup

### Clone the Repo

```bash
cd [your desired directory]
# e.g.
# cd ~/Downloads
# cd ~/code
git clone https://github.com/christopheroka/neovim-workshop
```

### Neovim

1. Download Neovim

Mac

```bash
brew install neovim
```

Windows

```bash
winget install Neovim.Neovim
```

2. Copy config files into config destination

Mac

```bash
mkdir -p ~/.config
cp -R [clone location]/nvim ~/.config/nvim
```

Windows

```bash
New-Item -ItemType Directory -Force "$env:LOCALAPPDATA\nvim"Copy-Item -Recurse "[clone location]\nvim\*" "$env:LOCALAPPDATA\nvim"
```

3. Open Neovim

```bash
cd [cloned directory]/neovim-workshop
# e.g.
# cd ~/code/neovim-workshop
nvim
```

### VS Code / Cursor

1. Open Extensions panel (Cmd + Shift + X)
2. Search Vim
3. Install the first option (vscodevim)
4. Cmd + Shift + P → “Open User Settings (JSON)”
5. Paste in these config options

```json
{
  "vim.useSystemClipboard": true,
  "vim.hlsearch": true,
  "vim.incsearch": true,
  "vim.highlightedyank.enable": true,
  "vim.leader": "<space>",
  "vim.insertModeKeyBindings": [
    {
      "before": ["j", "k"],
      "after": ["<Esc>"]
    }
  ],
  "editor.lineNumbers": "relative"
}
```

6. Save (might need a restart)

### JetBrains (IntelliJ IDEA, WebStorm, CLion, etc.)

1. Go to Settings/Preferences → Plugins
2. Search “IdeaVim”
3. Open your terminal
4. Create `./ideavimrc` file with:
   Mac

```bash
touch ~/.ideavimrc (Mac)
```

Windows

```bash
New-Item "$HOME\.ideavimrc" -ItemType File
```

7. Add config to file

```
let mapleader = ""

set number
set relativenumber
set incsearch
set hlsearch
set ignorecase
set smartcase
set clipboard+=namedplus

inoremap jk <Esc>
```

## Vim Modes

### Normal Mode (aka move yourself and your code around mode)

Navigate up, down, left and right, while deleting and pasting code.

### Insert Mode (aka typing mode)

Type as you normally would, using your keyboard to add and delete text.

### Visual Mode (aka click and drag mode)

Selects a chunk of text for you to do something with (delete, copy, etc.)

### Visual Line Mode (aka click and drag the whole line)

Select lines of text for you to do something with.
Basically the same as Visual Mode but with entire lines instead of letting you select a specific location on the line.

## Getting between modes

### Normal -> Insert

`i` - insert before your cursor

`a` - insert after your cursor

`o` - insert below your cursor (with a new line)

`O` - insert above your cursor (with a new line)

`I` - insert at the start of the line

`A` - insert at the end of the line

### Insert -> Normal

`jk` (recommended)

`Esc`

### Normal -> Visual

`v` (visual)

`V` (visual line)

### Visual -> Normal

`v` (if you're in visual mode)

`V` (if you're in visual line mode)

## Vim Keybinds

### In Normal Mode

#### Movement

`h` - left

`l` - right

`j` - down

`k` - up

`w` - move forward a word

`e` - move forward to the end of the word

`b` - move backwards a word

`f` + [another character] - finds that character in the line you're on

`Ctrl + u` (up) - Move half a page up

`Ctrl + d` (down) - Move half a page down

#### Modifying code

`dd` - delete line

`D` - delete from your cursor until the end of the line

`yy` - yank (copy) line

`Y` - yank (copy) form your cursor until the end of the line
