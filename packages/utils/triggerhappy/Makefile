#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=triggerhappy
PKG_VERSION:=0.1.6
PKG_REV:=01bedc72451f8afd0c35649dd67c428c44a0f737
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=git://github.com/wertarbyte/triggerhappy
PKG_SOURCE_PROTO:=git
PKG_SOURCE_SUBDIR:=$(PKG_NAME)-$(PKG_VERSION)
PKG_SOURCE_VERSION:=$(PKG_REV)

include $(INCLUDE_DIR)/package.mk

define Package/triggerhappy
  SECTION:=utils
  CATEGORY:=Utilities
  TITLE:=handle input events and run configured programs
  URL:=http://github.com/wertarbyte/triggerhappy
endef

define Package/triggerhappy/description
	triggerhappy - handle input events and run configured programs
	The daemon thd can handle hotplugged input devices and is configured through
	simple configuration files in /etc/triggerhappy/triggers.d/.
endef

MAKE_FLAGS += \
	LINUX_INPUT_H=$(TOOLCHAIN_DIR)/include/linux/input.h \
	$(TARGET_CONFIGURE_OPTS) \
	$(1)

define Package/triggerhappy/install
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_DIR) $(1)/etc
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_DIR) $(1)/etc/triggerhappy
	$(INSTALL_DIR) $(1)/etc/triggerhappy/triggers.d/
	$(INSTALL_DIR) $(1)/etc/hotplug.d/input/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/thd $(1)/usr/sbin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/th-cmd $(1)/usr/sbin
	$(INSTALL_BIN) ./files/triggerhappy.init $(1)/etc/init.d/triggerhappy
	$(INSTALL_BIN) ./files/triggerhappy.hotplug $(1)/etc/hotplug.d/input/10-triggerhappy
	$(INSTALL_BIN) ./files/triggerhappy-example.conf $(1)/etc/triggerhappy/triggers.d/example.conf
endef

$(eval $(call BuildPackage,triggerhappy))
