/***********************license start***************
 * Copyright (c) 2003-2008  Cavium Networks (support@cavium.com). All rights
 * reserved.
 *
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer in the documentation and/or other materials provided
 *       with the distribution.
 *
 *     * Neither the name of Cavium Networks nor the names of
 *       its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written
 *       permission.
 *
 * This Software, including technical data, may be subject to U.S.  export
 * control laws, including the U.S.  Export Administration Act and its
 * associated regulations, and may be subject to export or import regulations
 * in other countries.  You warrant that You will comply strictly in all
 * respects with all such regulations and acknowledge that you have the
 * responsibility to obtain licenses to export, re-export or import the
 * Software.
 *
 * TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SOFTWARE IS PROVIDED "AS IS"
 * AND WITH ALL FAULTS AND CAVIUM NETWORKS MAKES NO PROMISES, REPRESENTATIONS
 * OR WARRANTIES, EITHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH
 * RESPECT TO THE SOFTWARE, INCLUDING ITS CONDITION, ITS CONFORMITY TO ANY
 * REPRESENTATION OR DESCRIPTION, OR THE EXISTENCE OF ANY LATENT OR PATENT
 * DEFECTS, AND CAVIUM SPECIFICALLY DISCLAIMS ALL IMPLIED (IF ANY) WARRANTIES
 * OF TITLE, MERCHANTABILITY, NONINFRINGEMENT, FITNESS FOR A PARTICULAR
 * PURPOSE, LACK OF VIRUSES, ACCURACY OR COMPLETENESS, QUIET ENJOYMENT, QUIET
 * POSSESSION OR CORRESPONDENCE TO DESCRIPTION.  THE ENTIRE RISK ARISING OUT
 * OF USE OR PERFORMANCE OF THE SOFTWARE LIES WITH YOU.
 *
 *
 * For any questions regarding licensing please contact marketing@caviumnetworks.com
 *
 ***********************license end**************************************/






/**
 * @file
 *
 * Interface to the TWSI / I2C bus
 *
 * <hr>$Revision: 33479 $<hr>
 *
 */

#include "cvmx.h"
#include "cvmx-twsi.h"


/**
 * Read 8-bit from a device on the TWSI / I2C bus
 *
 * @param twsi_id  Which TWSI bus to use. CN3XXX, CN58XX, and CN50XX only
 *                 support 0. CN56XX and CN57XX support 0-1.
 * @param dev_addr I2C device address (7 bit)
 * @param internal_addr
 *                 Internal device address
 *
 * @return 8-bit data or < 0 in case of error
 */
int cvmx_twsix_read8(int twsi_id, uint8_t dev_addr, uint8_t internal_addr)
{
    /* 8 bit internal address */
    cvmx_mio_twsx_sw_twsi_t sw_twsi_val;

    sw_twsi_val.u64 = 0;
    sw_twsi_val.s.v = 1;
    sw_twsi_val.s.a = dev_addr;
    sw_twsi_val.s.d = internal_addr;
    cvmx_write_csr(CVMX_MIO_TWSX_SW_TWSI(twsi_id), sw_twsi_val.u64);
    while (((cvmx_mio_twsx_sw_twsi_t)(sw_twsi_val.u64 = cvmx_read_csr(CVMX_MIO_TWSX_SW_TWSI(twsi_id)))).s.v)
        ;
    if (!sw_twsi_val.s.r)
        return -1;

    return cvmx_twsi_read8_cur_addr(dev_addr);
}

/**
 * Read 8-bit from a device on the TWSI / I2C bus
 *
 * Uses current internal address
 *
 * @param twsi_id  Which TWSI bus to use. CN3XXX, CN58XX, and CN50XX only
 *                 support 0. CN56XX and CN57XX support 0-1.
 * @param dev_addr I2C device address (7 bit)
 *
 * @return 8-bit value or < 0 in case of error
 */
int cvmx_twsix_read8_cur_addr(int twsi_id, uint8_t dev_addr)
{
    cvmx_mio_twsx_sw_twsi_t sw_twsi_val;

    sw_twsi_val.u64 = 0;
    sw_twsi_val.s.v = 1;
    sw_twsi_val.s.a = dev_addr;
    sw_twsi_val.s.r = 1;

    cvmx_write_csr(CVMX_MIO_TWSX_SW_TWSI(twsi_id), sw_twsi_val.u64);
    while (((cvmx_mio_twsx_sw_twsi_t)(sw_twsi_val.u64 = cvmx_read_csr(CVMX_MIO_TWSX_SW_TWSI(twsi_id)))).s.v)
        ;
    if (!sw_twsi_val.s.r)
        return -1;
    else
        return(sw_twsi_val.s.d & 0xFF);
}

/**
 * Write 8-bit to a device on the TWSI / I2C bus
 *
 * @param twsi_id  Which TWSI bus to use. CN3XXX, CN58XX, and CN50XX only
 *                 support 0. CN56XX and CN57XX support 0-1.
 * @param dev_addr I2C device address (7 bit)
 * @param internal_addr
 *                 Internal device address
 * @param data     Data to be written
 *
 * @return 0 on success and < 0 in case of error
 */
int cvmx_twsix_write8(int twsi_id, uint8_t dev_addr, uint8_t internal_addr, uint8_t data)
{
    /* 8 bit internal address */
    cvmx_mio_twsx_sw_twsi_t sw_twsi_val;

    sw_twsi_val.u64 = 0;
    sw_twsi_val.s.v = 1;
    sw_twsi_val.s.op = 1;
    sw_twsi_val.s.a = dev_addr;
    sw_twsi_val.s.ia = internal_addr >> 3;
    sw_twsi_val.s.eop_ia = internal_addr & 0x7;
    sw_twsi_val.s.d = data;

    cvmx_write_csr(CVMX_MIO_TWSX_SW_TWSI(twsi_id), sw_twsi_val.u64);
    while (((cvmx_mio_twsx_sw_twsi_t)(sw_twsi_val.u64 = cvmx_read_csr(CVMX_MIO_TWSX_SW_TWSI(twsi_id)))).s.v)
        ;
    if (!sw_twsi_val.s.r)
        return -1;

    return 0;
}


