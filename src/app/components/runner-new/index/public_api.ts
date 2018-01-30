import { CreateLib } from 'ng-react-component';

const props = [];
props.push(new CreateLib('weui-header', '顶部导航', {
    children: [
        new CreateLib('weui-header-options', '城市选择', {
            address: '杭州市',
            lat: '',
            lng: '',
            style: {
                [`position`]: 'absolute',
                [`min-width`]: '44px',
                [`height.%`]: '100',
                [`left.px`]: '0',
                [`top.px`]: '0'
            }
        }),
        new CreateLib('weui-header-options', '城市选择', {
            address: '杭州市',
            lat: '',
            lng: '',
            style: {
                [`text-align`]: 'center',
                [`width.%`]: '100',
                [`height.%`]: '100',
            }
        }),
        new CreateLib('weui-header-options', '城市选择', {
            address: '杭州市',
            lat: '',
            lng: '',
            style: {
                [`position`]: 'absolute',
                [`min-width`]: '44px',
                [`height.%`]: '100',
                [`right.px`]: '0',
                [`top.px`]: '0'
            }
        })
    ]
}));

props.push(new CreateLib('weui-body', '主要内容', {
    children: [
        new CreateLib('weui-swiper', '滑动广告', {
            children: [
                new CreateLib('weui-swiper-item', '广告1', {
                    src: '',
                    link: '',
                    title: '',
                    end_time: ''
                }),
                new CreateLib('weui-swiper-item', '广告2', {
                    src: '',
                    link: '',
                    title: '',
                    end_time: ''
                }),
                new CreateLib('weui-swiper-item', '广告3', {
                    src: '',
                    link: '',
                    title: '',
                    end_time: ''
                }),
            ]
        }),
        new CreateLib('weui-nav', '导航', {
            children: [
                new CreateLib('weui-nav-item', '导航项目', {
                    icon: '',
                    title: '',
                    link: ''
                }),
                new CreateLib('weui-nav-item', '导航项目', {
                    icon: '',
                    title: '',
                    link: ''
                }),
                new CreateLib('weui-nav-item', '导航项目', {
                    icon: '',
                    title: '',
                    link: ''
                }),
                new CreateLib('weui-nav-item', '导航项目', {
                    icon: '',
                    title: '',
                    link: ''
                }),
            ]
        }),
        new CreateLib('weui-list', '列表', {
            url: '',
            page: 1,
            psize: 10,
            params: {},
            itemProps: {},
            children: []
        })
    ]
}));

props.push(new CreateLib('weui-footer', '底部导航', {
    children: [
        new CreateLib('weui-footer-item', '菜单项目', {
            title: '首页',
            icon: '',
            hasTip: false
        }),
        new CreateLib('weui-footer-item', '菜单项目', {
            title: '发布',
            icon: '',
            hasTip: false
        }),
        new CreateLib('weui-footer-item', '菜单项目', {
            title: '认证',
            icon: '',
            hasTip: false
        }),
        new CreateLib('weui-footer-item', '菜单项目', {
            title: '我的',
            icon: '',
            hasTip: false
        })
    ]
}));

export const indexProps = props;