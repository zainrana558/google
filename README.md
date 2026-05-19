# luminaa2 | Streaming Infrastructure

## DevOps & Transcoding Guide

To prepare assets for the LUMINAA platform, use the following FFmpeg commands to transcode raw MP4 files into multi-bitrate HLS adaptive streams.

### 1. Multi-Variant HLS Transcoding
This command generates a master playlist with multiple resolution variants (1080p, 720p, 480p).

```bash
ffmpeg -i input.mp4 \
  -preset slow -g 48 -sc_threshold 0 \
  -map 0:0 -map 0:1 -map 0:0 -map 0:1 -map 0:0 -map 0:1 \
  -s:v:0 1920x1080 -c:v:0 libx264 -b:v:0 5000k -maxrate:v:0 5350k -bufsize:v:0 7500k \
  -s:v:1 1280x720  -c:v:1 libx264 -b:v:1 2800k -maxrate:v:1 2996k -bufsize:v:1 4200k \
  -s:v:2 640x360   -c:v:2 libx264 -b:v:2 800k  -maxrate:v:2 856k  -bufsize:v:2 1200k \
  -c:a copy \
  -f hls \
  -hls_time 4 \
  -hls_playlist_type event \
  -hls_flags independent_segments \
  -master_pl_name master.m3u8 \
  -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" stream_%v.m3u8
```

### 2. Cloudflare R2 Deployment
Upload the generated `.m3u8` and `.ts` files to your R2 bucket.

1. Ensure the bucket has Public access or a Workers proxy.
2. Set `DATABASE_URL` for the primary and backup stream locations.
3. Configure CORS on R2 to allow your domain:
   ```json
   [
     {
       "AllowedOrigins": ["*"],
       "AllowedMethods": ["GET"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

### 3. Failover Configuration
The `VideoPlayer` component automatically detects network errors. To test:
1. Provide a `primaryUrl` that returns a 404 or 503.
2. Provide a valid `backupUrl`.
3. Observe the "Failover Mode Active" pulse in the UI.
