# -*- coding: utf-8 -*-
# **********************************************************************
#
# Copyright (c) 2003-2016 ZeroC, Inc. All rights reserved.
#
# This copy of Ice is licensed to you under the terms described in the
# ICE_LICENSE file included in this distribution.
#
# **********************************************************************
#
# Ice version 3.6.3
#
# <auto-generated>
#
# Generated from file `visualization.ice'
#
# Warning: do not edit this file.
#
# </auto-generated>
#

from sys import version_info as _version_info_
import Ice, IcePy

# Start of module jderobot
_M_jderobot = Ice.openModule('jderobot')
__name__ = 'jderobot'

if 'RGBPoint' not in _M_jderobot.__dict__:
    _M_jderobot.RGBPoint = Ice.createTempClass()
    class RGBPoint(object):
        def __init__(self, x=0.0, y=0.0, z=0.0, r=0.0, g=0.0, b=0.0):
            self.x = x
            self.y = y
            self.z = z
            self.r = r
            self.g = g
            self.b = b

        def __eq__(self, other):
            if other is None:
                return False
            elif not isinstance(other, _M_jderobot.RGBPoint):
                return NotImplemented
            else:
                if self.x != other.x:
                    return False
                if self.y != other.y:
                    return False
                if self.z != other.z:
                    return False
                if self.r != other.r:
                    return False
                if self.g != other.g:
                    return False
                if self.b != other.b:
                    return False
                return True

        def __ne__(self, other):
            return not self.__eq__(other)

        def __str__(self):
            return IcePy.stringify(self, _M_jderobot._t_RGBPoint)

        __repr__ = __str__

    _M_jderobot._t_RGBPoint = IcePy.defineStruct('::jderobot::RGBPoint', RGBPoint, (), (
        ('x', (), IcePy._t_float),
        ('y', (), IcePy._t_float),
        ('z', (), IcePy._t_float),
        ('r', (), IcePy._t_float),
        ('g', (), IcePy._t_float),
        ('b', (), IcePy._t_float)
    ))

    _M_jderobot.RGBPoint = RGBPoint
    del RGBPoint

if 'Point' not in _M_jderobot.__dict__:
    _M_jderobot.Point = Ice.createTempClass()
    class Point(object):
        def __init__(self, x=0.0, y=0.0, z=0.0):
            self.x = x
            self.y = y
            self.z = z

        def __eq__(self, other):
            if other is None:
                return False
            elif not isinstance(other, _M_jderobot.Point):
                return NotImplemented
            else:
                if self.x != other.x:
                    return False
                if self.y != other.y:
                    return False
                if self.z != other.z:
                    return False
                return True

        def __ne__(self, other):
            return not self.__eq__(other)

        def __str__(self):
            return IcePy.stringify(self, _M_jderobot._t_Point)

        __repr__ = __str__

    _M_jderobot._t_Point = IcePy.defineStruct('::jderobot::Point', Point, (), (
        ('x', (), IcePy._t_float),
        ('y', (), IcePy._t_float),
        ('z', (), IcePy._t_float)
    ))

    _M_jderobot.Point = Point
    del Point

if 'Segment' not in _M_jderobot.__dict__:
    _M_jderobot.Segment = Ice.createTempClass()
    class Segment(object):
        def __init__(self, fromPoint=Ice._struct_marker, toPoint=Ice._struct_marker):
            if fromPoint is Ice._struct_marker:
                self.fromPoint = _M_jderobot.Point()
            else:
                self.fromPoint = fromPoint
            if toPoint is Ice._struct_marker:
                self.toPoint = _M_jderobot.Point()
            else:
                self.toPoint = toPoint

        def __eq__(self, other):
            if other is None:
                return False
            elif not isinstance(other, _M_jderobot.Segment):
                return NotImplemented
            else:
                if self.fromPoint != other.fromPoint:
                    return False
                if self.toPoint != other.toPoint:
                    return False
                return True

        def __ne__(self, other):
            return not self.__eq__(other)

        def __str__(self):
            return IcePy.stringify(self, _M_jderobot._t_Segment)

        __repr__ = __str__

    _M_jderobot._t_Segment = IcePy.defineStruct('::jderobot::Segment', Segment, (), (
        ('fromPoint', (), _M_jderobot._t_Point),
        ('toPoint', (), _M_jderobot._t_Point)
    ))

    _M_jderobot.Segment = Segment
    del Segment

if 'Color' not in _M_jderobot.__dict__:
    _M_jderobot.Color = Ice.createTempClass()
    class Color(object):
        def __init__(self, r=0.0, g=0.0, b=0.0):
            self.r = r
            self.g = g
            self.b = b

        def __eq__(self, other):
            if other is None:
                return False
            elif not isinstance(other, _M_jderobot.Color):
                return NotImplemented
            else:
                if self.r != other.r:
                    return False
                if self.g != other.g:
                    return False
                if self.b != other.b:
                    return False
                return True

        def __ne__(self, other):
            return not self.__eq__(other)

        def __str__(self):
            return IcePy.stringify(self, _M_jderobot._t_Color)

        __repr__ = __str__

    _M_jderobot._t_Color = IcePy.defineStruct('::jderobot::Color', Color, (), (
        ('r', (), IcePy._t_float),
        ('g', (), IcePy._t_float),
        ('b', (), IcePy._t_float)
    ))

    _M_jderobot.Color = Color
    del Color

if 'Visualization' not in _M_jderobot.__dict__:
    _M_jderobot.Visualization = Ice.createTempClass()
    class Visualization(Ice.Object):
        """
        Interface to the Visualization interaction.
        """
        def __init__(self):
            if Ice.getType(self) == _M_jderobot.Visualization:
                raise RuntimeError('jderobot.Visualization is an abstract class')

        def ice_ids(self, current=None):
            return ('::Ice::Object', '::jderobot::Visualization')

        def ice_id(self, current=None):
            return '::jderobot::Visualization'

        def ice_staticId():
            return '::jderobot::Visualization'
        ice_staticId = staticmethod(ice_staticId)

        def drawPoint(self, point, current=None):
            pass

        def drawSegment(self, seg, c, current=None):
            pass

        def drawPoint2(self, p, c, current=None):
            pass

        def clearAll(self, current=None):
            pass

        def __str__(self):
            return IcePy.stringify(self, _M_jderobot._t_Visualization)

        __repr__ = __str__

    _M_jderobot.VisualizationPrx = Ice.createTempClass()
    class VisualizationPrx(Ice.ObjectPrx):

        def drawPoint(self, point, _ctx=None):
            return _M_jderobot.Visualization._op_drawPoint.invoke(self, ((point, ), _ctx))

        def begin_drawPoint(self, point, _response=None, _ex=None, _sent=None, _ctx=None):
            return _M_jderobot.Visualization._op_drawPoint.begin(self, ((point, ), _response, _ex, _sent, _ctx))

        def end_drawPoint(self, _r):
            return _M_jderobot.Visualization._op_drawPoint.end(self, _r)

        def drawSegment(self, seg, c, _ctx=None):
            return _M_jderobot.Visualization._op_drawSegment.invoke(self, ((seg, c), _ctx))

        def begin_drawSegment(self, seg, c, _response=None, _ex=None, _sent=None, _ctx=None):
            return _M_jderobot.Visualization._op_drawSegment.begin(self, ((seg, c), _response, _ex, _sent, _ctx))

        def end_drawSegment(self, _r):
            return _M_jderobot.Visualization._op_drawSegment.end(self, _r)

        def drawPoint2(self, p, c, _ctx=None):
            return _M_jderobot.Visualization._op_drawPoint2.invoke(self, ((p, c), _ctx))

        def begin_drawPoint2(self, p, c, _response=None, _ex=None, _sent=None, _ctx=None):
            return _M_jderobot.Visualization._op_drawPoint2.begin(self, ((p, c), _response, _ex, _sent, _ctx))

        def end_drawPoint2(self, _r):
            return _M_jderobot.Visualization._op_drawPoint2.end(self, _r)

        def clearAll(self, _ctx=None):
            return _M_jderobot.Visualization._op_clearAll.invoke(self, ((), _ctx))

        def begin_clearAll(self, _response=None, _ex=None, _sent=None, _ctx=None):
            return _M_jderobot.Visualization._op_clearAll.begin(self, ((), _response, _ex, _sent, _ctx))

        def end_clearAll(self, _r):
            return _M_jderobot.Visualization._op_clearAll.end(self, _r)

        def checkedCast(proxy, facetOrCtx=None, _ctx=None):
            return _M_jderobot.VisualizationPrx.ice_checkedCast(proxy, '::jderobot::Visualization', facetOrCtx, _ctx)
        checkedCast = staticmethod(checkedCast)

        def uncheckedCast(proxy, facet=None):
            return _M_jderobot.VisualizationPrx.ice_uncheckedCast(proxy, facet)
        uncheckedCast = staticmethod(uncheckedCast)

        def ice_staticId():
            return '::jderobot::Visualization'
        ice_staticId = staticmethod(ice_staticId)

    _M_jderobot._t_VisualizationPrx = IcePy.defineProxy('::jderobot::Visualization', VisualizationPrx)

    _M_jderobot._t_Visualization = IcePy.defineClass('::jderobot::Visualization', Visualization, -1, (), True, False, None, (), ())
    Visualization._ice_type = _M_jderobot._t_Visualization

    Visualization._op_drawPoint = IcePy.Operation('drawPoint', Ice.OperationMode.Normal, Ice.OperationMode.Normal, False, None, (), (((), _M_jderobot._t_RGBPoint, False, 0),), (), ((), _M_jderobot._t_RGBPoint, False, 0), ())
    Visualization._op_drawSegment = IcePy.Operation('drawSegment', Ice.OperationMode.Normal, Ice.OperationMode.Normal, False, None, (), (((), _M_jderobot._t_Segment, False, 0), ((), _M_jderobot._t_Color, False, 0)), (), None, ())
    Visualization._op_drawPoint2 = IcePy.Operation('drawPoint2', Ice.OperationMode.Normal, Ice.OperationMode.Normal, False, None, (), (((), _M_jderobot._t_Point, False, 0), ((), _M_jderobot._t_Color, False, 0)), (), None, ())
    Visualization._op_clearAll = IcePy.Operation('clearAll', Ice.OperationMode.Normal, Ice.OperationMode.Normal, False, None, (), (), (), None, ())

    _M_jderobot.Visualization = Visualization
    del Visualization

    _M_jderobot.VisualizationPrx = VisualizationPrx
    del VisualizationPrx

# End of module jderobot