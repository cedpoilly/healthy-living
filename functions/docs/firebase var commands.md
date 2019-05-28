# Commands for setting the Firebase Config vars

```bash
firebase functions:config:set \
# Client ID
googleapi.client_id="1059825985046-670uhcvq5ekf6l0t4jtb4eipnng9trcu.apps.googleusercontent.com" \
# Client Secret
googleapi.client_secret="ZG_VxbAjI-tOmZy86FSNQAvP"

# Sheet ID
firebase functions:config:set googleapi.sheet_id="1m1DOXpaANj0e8CFkxAVHQhVkxRa5XM-p2NzOMb9Uyis"
# this one requires access from Marjorie: "1O26vlZgdiuTeTW01H2tgpjDCF8bJJXEmbN1YUWXhO98"
```

After updating the configuration, do run the following command to propagate it to the cloud.

```bash
firebase deploy --only functions
```
