# Upgrade Guide

## File Header v2 (DXT2)

Phase-2 introduces a new file header for encrypted blobs used by the FUSE
agent.  The header format is now:

```
magic  : 4 bytes  ("DXT2")
version: 1 byte   (0x02)
keyver : 4 bytes
chunk  : 4 bytes  - logical chunk size
flags  : 1 byte   - bit0=ZSTD
size   : 8 bytes  - plaintext file size
```

Files written by older versions carried the `DXT1` magic and lacked the
`flags` field.  The current agent will continue to read those files without any
migration steps.  New files are written using the `DXT2` header by default.

If you wish to upgrade existing data you may copy the files through the mounted
plain view which will transparently rewrite them using the new header.

## Optional Zstd compression

Setting the environment variable `DXT_ZSTD=1` enables the Zstd flag in the
header.  The PoC implementation currently leaves the data uncompressed but keeps
compatibility with future builds that may add actual compression.

## Filesystem agnostic

Earlier demos assumed an ext4 backing store.  The agent now relies only on
standard POSIX semantics and works on `xfs` or any other filesystem that
supports the required operations.
