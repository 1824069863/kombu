$(function(){
    $('#canvas-list').bubble({
          // 气泡元素Class
          itemClass: 'canvas-list',
          // 气泡大小范围[最小值, 最大值]，单位px
          size: [80, 140],
          // 气泡吹大时间范围[最小值, 最大值]，单位s
          blowTime: [0.5, 1],
          // 气泡出现的方向，left/right
          direction: 'left',
          // 位置偏移量，[x, y]，效果与 direction 相关
          offset: [0, 60],
          // 气泡产生时间间隔，单位s
          interval: 1.2,
          // 自动停止的时间，为0则不停止，单位s
          autoStop: 30
    })
})