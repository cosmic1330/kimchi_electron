# How do run xfreerdp

## In MacOS
1. Install XQuartz to support X11 in local machine.
    ```bash
    brew install xquartz
    ```
2. Open XQuartz and enable "Allow connections from network clients" in XQuartz -> Preferences -> Security.
3. Restart XQuartz.
4. Setting xhost access control list.
    ```bash
    xhost + ${hostname}
    # or /usr/X11/bin/xhost + ${hostname}
    ```
5. Run xfreerdp with X11 support.
    ```bash
    xfreerdp /u:username /p:password /v:ip
    ```