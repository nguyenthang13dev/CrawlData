'use client';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {/* Main Footer Section */}
        <div className={styles.mainFooter}>
          <nav className={styles.navFooter}>
            <a href="/lienhe.html" className={styles.navLink}>
              Liên hệ
            </a>
            <a href="https://loigiaihay.com/policy/vi.html" className={styles.navLink}>
              Chính sách
            </a>
          </nav>

          <div className={styles.copyright}>
            <p>
              Copyright © <strong>2021 loigiaihay.com</strong>
            </p>
            <a
              href="https://www.dmca.com/Protection/Status.aspx?ID=58bfe12e-47c6-4ce9-b0d3-8b2f7abac883&refurl=https://loigiaihay.com/lop-12.html"
              title="DMCA.com Protection Status"
              className={styles.dmcaBadge}
            >
              <img
                src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=58bfe12e-47c6-4ce9-b0d3-8b2f7abac883"
                alt="DMCA.com Protection Status"
              />
            </a>
            <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
          </div>
        </div>

        {/* Social Media Links */}
        <div className={styles.connectSocial}>
          <a
            href="https://www.facebook.com/Loigiaihay/?ref=br_rs"
            className={styles.connectSocialItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/themes/style/images/face.png" alt="Facebook" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCkMcHVF7v9DiW2OeMvNoj-A"
            className={styles.connectSocialItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/themes/style/images/youtube.png" alt="YouTube" />
          </a>
        </div>

        {/* App Download Links */}
        <div className={styles.connectApp}>
          <a
            href="https://apps.apple.com/vn/app/loigiaihay-com-l%E1%BB%9D-gi%E1%BA%A3i-hay/id1209891610"
            className={styles.connectAppItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/themes/style/images/ios2024.png"
              style={{ width: '131px', height: '39px' }}
              alt="App Loigiaihay trên apple store"
            />
          </a>
          <a
            href="https://goo.gl/lYsjxK"
            className={styles.connectAppItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/themes/style/images/android2024.png"
              style={{ width: '131px', height: '39px' }}
              alt="App Loigiaihay trên google play store"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
