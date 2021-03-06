#
# Copyright (C) 2006-2010 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v2.
# See /LICENSE for more information.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=nmap
PKG_VERSION:=5.35DC1
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.bz2
PKG_SOURCE_URL:=http://download.insecure.org/nmap/dist
PKG_MD5SUM:=5bc2f8629f26716aa78d4bfe474a5d3a

PKG_INSTALL:=1

include $(INCLUDE_DIR)/package.mk

define Package/nmap
  SECTION:=net
  CATEGORY:=Network
  DEPENDS:=+libdnet +libpcap +libpcre +uclibcxx
  TITLE:=Network exploration and/or security auditing utility
  URL:=http://nmap.org/
endef

define Package/nmap/description
 A free open source utility for network exploration or security auditing.
endef

CONFIGURE_ARGS += \
	--without-openssl \
	--without-nmapfe \
	--without-liblua \
	--with-libdnet=included \
	--with-libpcap="$(STAGING_DIR)/usr" \

CONFIGURE_VARS += \
	CPPFLAGS="$$$$CPPFLAGS -I$(STAGING_DIR)/usr/include/uClibc++" \
	CXXFLAGS="$$$$CXXFLAGS -fno-builtin -fno-rtti -nostdinc++" \
	LDFLAGS="$$$$LDFLAGS -lm" \
	LIBS="-nodefaultlibs -luClibc++ $(LIBGCC_S)" \

define Package/nmap/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/usr/bin/nmap $(1)/usr/bin/
	$(INSTALL_DIR) $(1)/usr/share/nmap
	for file in mac-prefixes os-db os-fingerprints protocols rpc service-probes services; do \
		$(CP) $(PKG_INSTALL_DIR)/usr/share/nmap/nmap-$$$$file $(1)/usr/share/nmap/ ; \
	done
endef

$(eval $(call BuildPackage,nmap))
