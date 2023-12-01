import { Image, Button, Icon, Dropdown } from "components";
import { useMemo } from "react";
import { MenuOutlined } from '@ant-design/icons';
import styles from "styles/elements/header.module.scss";

const MainHeader = ({
  className,
  toolbarMenu,
  avatarToolbar,
  filters,
  logout,
  search,
  logo,
  url,
  onClick,
  showlogo = true,
  avatar,
  loginHeader = false,
  showToggleMenu = true,
  ...props
}) => {
  const logoType = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    return origin === "https://ojk.media-insight.id";
  }, []);

  return (
    <div className={`${className} ${styles["head-wrap"]}`} {...props}>
      {
      showToggleMenu ?
        <MenuOutlined className={styles["head-anticon-menu"]} onClick={onClick}/>
      :
        null
      }
      <div className={styles["head-item-logo"]}>
        <Image
          src={logo}
          url={url ? url : null}
          layout="fill"
          objectFit="contain"
          alt="headLogo"
          height={120}
          width={120}
          priority="true"
        />
      </div>

      {loginHeader == false && (
        <div className={styles["head-item-toolbar"]}>
          <div className={styles["toolbar-item"]}>
            <Button
              size="small"
              className={styles["toolbar-button"]}
              icons="SearchOutlined"
              {...search}
            />
          </div>
          <div className={styles["toolbar-item"]}>
            <Button
              size="small"
              className={styles["toolbar-button"]}
              icons="FilterOutlined"
              {...filters}
            />
          </div>

          <div className={styles["toolbar-item"]}>
            <Button
              size="small"
              className={styles["toolbar-button"]}
              icons="LogoutOutlined"
              type="primary"
              danger="true"
              onClick={logout}
            />
          </div>

          {avatar != null && (
            <div className={styles["toolbar-item"]}>
              <>
                <Dropdown
                  trigger="click"
                  overlay={avatarToolbar}
                  overlayHeight="100%"
                >
                  <a
                    className={styles["toolbar-avatar"]}
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className={styles["avatar-img"]}>
                      <Image
                        src={avatar}
                        layout="fill"
                        objectFit="cover"
                        alt="avatar"
                        height={120}
                        width={120}
                        priority="true"
                      />
                    </div>
                    <Icon
                      className={styles["avatar-icon"]}
                      type="CaretDownOutlined"
                    />
                  </a>
                </Dropdown>
              </>
            </div>
          )}
        </div>
      )}

      {loginHeader == true && (
        <div className={styles["head-item-toolbar"]}>
          <div className={styles["toolbar-item"]}>
            {!logoType && (
              <>
                <Button size="small" type="text" icons="PhoneOutlined">
                  021-27939365
                </Button>

                <Button size="small" type="text" icons="MailOutlined">
                  info@digivla.id
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHeader;
